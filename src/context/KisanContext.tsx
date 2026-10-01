import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  Farmer,
  ProcurementCentre,
  QueueItem,
  ProcurementRecord,
  NotificationItem,
  UserRole,
  ProcurementStepId,
  CongestionLevel,
  BookingFormData
} from '../types';
import {
  INITIAL_FARMER,
  INITIAL_OFFICER,
  INITIAL_CENTRES,
  INITIAL_QUEUE,
  INITIAL_PROCUREMENT,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';
import { playNotificationSound } from '../utils/audio';

interface ToastAlert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  title: string;
  message: string;
}

interface KisanContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  farmer: Farmer;
  officer: typeof INITIAL_OFFICER;
  centres: ProcurementCentre[];
  selectedCentre: ProcurementCentre;
  setSelectedCentre: (centre: ProcurementCentre) => void;
  queue: QueueItem[];
  currentToken: string;
  farmerToken: string;
  farmersAhead: number;
  estimatedWaitMinutes: number;
  procurement: ProcurementRecord;
  notifications: NotificationItem[];
  unreadCount: number;
  toast: ToastAlert | null;
  clearToast: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  callNextToken: () => void;
  updateProcurementStep: (stepId: ProcurementStepId) => void;
  bookSlot: (formData: BookingFormData) => Promise<string>;
  resetDemo: () => void;
  getCongestionLevel: (waitingCount: number) => CongestionLevel;
}

const KisanContext = createContext<KisanContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CENTRES: 'kisansetu_centres_v1',
  QUEUE: 'kisansetu_queue_v1',
  PROCUREMENT: 'kisansetu_procurement_v1',
  NOTIFICATIONS: 'kisansetu_notifs_v1',
  FARMER: 'kisansetu_farmer_v1',
  ROLE: 'kisansetu_role_v1',
};

// Cross-tab synchronization channel
let syncChannel: BroadcastChannel | null = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    syncChannel = new BroadcastChannel('kisansetu_realtime_sync');
  }
} catch {
  // BroadcastChannel unavailable
}

export const KisanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or initial mock data
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as UserRole) || 'farmer';
  });

  const [farmer, setFarmer] = useState<Farmer>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FARMER);
    return saved ? JSON.parse(saved) : INITIAL_FARMER;
  });

  const officer = INITIAL_OFFICER;

  const [centres, setCentres] = useState<ProcurementCentre[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CENTRES);
    return saved ? JSON.parse(saved) : INITIAL_CENTRES;
  });

  const [selectedCentreId, setSelectedCentreId] = useState<string>('centre_a');

  const [queue, setQueue] = useState<QueueItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUEUE);
    return saved ? JSON.parse(saved) : INITIAL_QUEUE;
  });

  const [procurement, setProcurement] = useState<ProcurementRecord>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROCUREMENT);
    return saved ? JSON.parse(saved) : INITIAL_PROCUREMENT;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [toast, setToast] = useState<ToastAlert | null>(null);

  const clearToast = useCallback(() => setToast(null), []);

  const selectedCentre = useMemo(() => {
    return centres.find(c => c.id === selectedCentreId) || centres[0];
  }, [centres, selectedCentreId]);

  const setSelectedCentre = useCallback((centre: ProcurementCentre) => {
    setSelectedCentreId(centre.id);
  }, []);

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem(STORAGE_KEYS.ROLE, newRole);
  }, []);

  // Save changes to localStorage and broadcast to other tabs
  const persistAndBroadcast = useCallback((
    newCentres?: ProcurementCentre[],
    newQueue?: QueueItem[],
    newProcurement?: ProcurementRecord,
    newNotifications?: NotificationItem[],
    broadcastMessage?: string
  ) => {
    if (newCentres) {
      setCentres(newCentres);
      localStorage.setItem(STORAGE_KEYS.CENTRES, JSON.stringify(newCentres));
    }
    if (newQueue) {
      setQueue(newQueue);
      localStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(newQueue));
    }
    if (newProcurement) {
      setProcurement(newProcurement);
      localStorage.setItem(STORAGE_KEYS.PROCUREMENT, JSON.stringify(newProcurement));
    }
    if (newNotifications) {
      setNotifications(newNotifications);
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(newNotifications));
    }

    if (syncChannel) {
      syncChannel.postMessage({
        type: 'STATE_UPDATED',
        timestamp: Date.now(),
        message: broadcastMessage,
      });
    }
  }, []);

  // Reload state from storage
  const reloadFromStorage = useCallback(() => {
    try {
      const savedCentres = localStorage.getItem(STORAGE_KEYS.CENTRES);
      if (savedCentres) setCentres(JSON.parse(savedCentres));

      const savedQueue = localStorage.getItem(STORAGE_KEYS.QUEUE);
      if (savedQueue) setQueue(JSON.parse(savedQueue));

      const savedProc = localStorage.getItem(STORAGE_KEYS.PROCUREMENT);
      if (savedProc) setProcurement(JSON.parse(savedProc));

      const savedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));

      const savedFarmer = localStorage.getItem(STORAGE_KEYS.FARMER);
      if (savedFarmer) setFarmer(JSON.parse(savedFarmer));
    } catch (e) {
      console.error('Failed to reload from storage:', e);
    }
  }, []);

  // Listen to cross-tab updates via BroadcastChannel & Storage Event
  useEffect(() => {
    if (syncChannel) {
      const handleBroadcast = (event: MessageEvent) => {
        if (event.data && event.data.type === 'STATE_UPDATED') {
          reloadFromStorage();
        }
      };
      syncChannel.addEventListener('message', handleBroadcast);
      return () => {
        syncChannel?.removeEventListener('message', handleBroadcast);
      };
    }
  }, [reloadFromStorage]);

  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key && event.key.startsWith('kisansetu_')) {
        reloadFromStorage();
      }
    };
    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, [reloadFromStorage]);

  // Congestion calculation formula as specified:
  // <= 15: LOW CONGESTION
  // 16 to 40: MODERATE CONGESTION
  // > 40: HIGH CONGESTION
  const getCongestionLevel = useCallback((waitingCount: number): CongestionLevel => {
    if (waitingCount <= 15) return 'LOW';
    if (waitingCount <= 40) return 'MODERATE';
    return 'HIGH';
  }, []);

  // Compute current token and farmer's position
  const currentToken = selectedCentre?.currentToken || 'A-038';
  const farmerToken = farmer.activeToken || 'A-047';

  // Calculate how many waiting farmers are ahead of the farmer's token
  const { farmersAhead, estimatedWaitMinutes } = useMemo(() => {
    const farmerItem = queue.find(q => q.tokenNumber === farmerToken);
    if (!farmerItem || farmerItem.status === 'completed' || farmerItem.status === 'serving') {
      return {
        farmersAhead: farmerItem?.status === 'serving' ? 0 : 0,
        estimatedWaitMinutes: 0
      };
    }

    const currentServing = queue.find(q => q.status === 'serving');
    const currentSeq = currentServing ? currentServing.tokenSeq : 38;

    // Farmers waiting strictly ahead of this farmer
    const countAhead = queue.filter(
      q => q.centreId === selectedCentre.id &&
           q.status === 'waiting' &&
           q.tokenSeq < farmerItem.tokenSeq
    ).length;

    // Smart ETA formula: Farmers Ahead × Average Processing Time
    const avgMinutes = selectedCentre.avgProcessingMinutes || 4;
    const estWait = Math.max(0, countAhead * avgMinutes);

    return {
      farmersAhead: Math.max(0, countAhead),
      estimatedWaitMinutes: estWait
    };
  }, [queue, farmerToken, selectedCentre]);

  // OFFICER ACTION: CALL NEXT TOKEN
  const callNextToken = useCallback(() => {
    const centreQueue = [...queue];
    const currentlyServingIdx = centreQueue.findIndex(q => q.status === 'serving');

    if (currentlyServingIdx !== -1) {
      centreQueue[currentlyServingIdx] = {
        ...centreQueue[currentlyServingIdx],
        status: 'completed',
        completedAt: new Date().toISOString(),
      };
    }

    const nextWaitingIdx = centreQueue.findIndex(q => q.status === 'waiting');
    if (nextWaitingIdx === -1) {
      setToast({
        id: Date.now().toString(),
        type: 'info',
        title: 'Queue Completed',
        message: 'All registered farmers for this slot have been served.',
      });
      return;
    }

    const nextFarmer = centreQueue[nextWaitingIdx];
    centreQueue[nextWaitingIdx] = {
      ...nextFarmer,
      status: 'serving',
      calledAt: new Date().toISOString(),
    };

    const nextTokenNumber = nextFarmer.tokenNumber;

    // Update centre stats
    const updatedCentres = centres.map(c => {
      if (c.id === selectedCentre.id) {
        const remainingWaiting = centreQueue.filter(q => q.centreId === c.id && q.status === 'waiting').length;
        const newCompleted = c.completedCount + 1;
        return {
          ...c,
          currentToken: nextTokenNumber,
          waitingCount: remainingWaiting,
          completedCount: newCompleted,
        };
      }
      return c;
    });

    // Check Ramesh's ahead count to trigger notifications
    const newCountAhead = centreQueue.filter(
      q => q.centreId === selectedCentre.id &&
           q.status === 'waiting' &&
           q.tokenSeq < 47 // Ramesh is token 47
    ).length;

    const newNotifications = [...notifications];

    if (nextTokenNumber === farmerToken) {
      // Ramesh is now serving!
      playNotificationSound('alert');
      setToast({
        id: Date.now().toString(),
        type: 'success',
        title: '🟢 Your Turn is Now!',
        message: `Token ${farmerToken} is now being served at Procurement Counter #2.`,
      });
      newNotifications.unshift({
        id: `notif_${Date.now()}`,
        farmerId: farmer.id,
        title: '🟢 Your Turn is Now!',
        message: 'Your token is being called. Please proceed immediately to Counter #2.',
        type: 'turn_next',
        read: false,
        createdAt: 'Just now',
      });
    } else if (newCountAhead <= 2 && newCountAhead > 0) {
      // Farmers ahead <= 2: Turn is next
      playNotificationSound('alert');
      setToast({
        id: Date.now().toString(),
        type: 'success',
        title: '🟢 Your turn is next!',
        message: 'Please proceed to the procurement counter immediately.',
      });
      newNotifications.unshift({
        id: `notif_${Date.now()}`,
        farmerId: farmer.id,
        title: '🟢 Your turn is next!',
        message: `Only ${newCountAhead} farmer(s) ahead. Please move to the procurement counter.`,
        type: 'turn_next',
        read: false,
        createdAt: 'Just now',
      });
    } else if (newCountAhead <= 5) {
      // Farmers ahead <= 5: Turn is approaching
      playNotificationSound('alert');
      setToast({
        id: Date.now().toString(),
        type: 'warning',
        title: '🟡 Your turn is approaching!',
        message: 'When only a few farmers remain ahead of you, please start moving toward the procurement counter.',
      });
      newNotifications.unshift({
        id: `notif_${Date.now()}`,
        farmerId: farmer.id,
        title: '🟡 Your turn is approaching!',
        message: `${newCountAhead} farmers remaining ahead. Estimated wait: ~${newCountAhead * 4} mins.`,
        type: 'turn_approaching',
        read: false,
        createdAt: 'Just now',
      });
    } else {
      playNotificationSound('subtle');
    }

    persistAndBroadcast(
      updatedCentres,
      centreQueue,
      procurement,
      newNotifications,
      `Called ${nextTokenNumber}`
    );
  }, [queue, centres, selectedCentre.id, farmerToken, farmer.id, notifications, persistAndBroadcast, procurement]);

  // OFFICER ACTION: ADVANCE PROCUREMENT STAGES
  const updateProcurementStep = useCallback((stepId: ProcurementStepId) => {
    const stepOrder: ProcurementStepId[] = [
      'slot_booked',
      'farmer_arrived',
      'quality_check',
      'weighed',
      'accepted',
      'payment_initiated',
      'payment_completed',
    ];

    const targetIdx = stepOrder.indexOf(stepId);
    if (targetIdx === -1) return;

    const updatedSteps = procurement.steps.map(step => {
      const idx = stepOrder.indexOf(step.id);
      if (idx < targetIdx) {
        return { ...step, status: 'completed' as const, timestamp: step.timestamp || 'Today' };
      } else if (idx === targetIdx) {
        return {
          ...step,
          status: (stepId === 'payment_completed' ? 'completed' : 'current') as 'completed' | 'current' | 'pending',
          timestamp: 'Just now',
        };
      } else {
        return { ...step, status: 'pending' as const };
      }
    });

    const updatedProcurement: ProcurementRecord = {
      ...procurement,
      currentStep: stepId,
      steps: updatedSteps,
      updatedAt: new Date().toISOString(),
    };

    const targetStep = procurement.steps.find(s => s.id === stepId);
    const stepLabel = targetStep?.label || stepId;

    const newNotifications = [
      {
        id: `notif_${Date.now()}`,
        farmerId: farmer.id,
        title: `Procurement Status: ${stepLabel}`,
        message: `Your procurement progress has advanced to "${stepLabel}". Check timeline for verification details.`,
        type: 'procurement_update' as const,
        read: false,
        createdAt: 'Just now',
      },
      ...notifications,
    ];

    playNotificationSound('success');
    setToast({
      id: Date.now().toString(),
      type: 'info',
      title: 'Procurement Updated',
      message: `Farmer timeline updated to: ${stepLabel}`,
    });

    persistAndBroadcast(
      centres,
      queue,
      updatedProcurement,
      newNotifications,
      `Procurement advanced to ${stepLabel}`
    );
  }, [procurement, farmer.id, notifications, persistAndBroadcast, centres, queue]);

  // BOOK SLOT ACTION
  const bookSlot = useCallback(async (formData: BookingFormData): Promise<string> => {
    // Generate new token seq
    const nextSeq = 47; // Default to demonstration token A-047
    const tokenNumber = `A-0${nextSeq}`;

    const newQueueItem: QueueItem = {
      id: `q_${Date.now()}`,
      centreId: formData.centreId,
      farmerId: farmer.id,
      farmerName: farmer.name,
      farmerPhone: farmer.phone,
      crop: formData.crop,
      quantityQuintals: formData.quantityQuintals,
      tokenNumber,
      tokenSeq: nextSeq,
      slotTime: formData.timeSlot,
      status: 'waiting',
      createdAt: new Date().toISOString(),
    };

    const updatedFarmer: Farmer = {
      ...farmer,
      activeToken: tokenNumber,
      preferredCentre: formData.centreId,
    };
    setFarmer(updatedFarmer);
    localStorage.setItem(STORAGE_KEYS.FARMER, JSON.stringify(updatedFarmer));

    // Update queue list
    const updatedQueue = [...queue.filter(q => q.tokenNumber !== tokenNumber), newQueueItem];

    // Update centre booked count
    const updatedCentres = centres.map(c => {
      if (c.id === formData.centreId) {
        return {
          ...c,
          bookedCount: c.bookedCount + 1,
          waitingCount: c.waitingCount + 1,
        };
      }
      return c;
    });

    const newNotifications: NotificationItem[] = [
      {
        id: `notif_${Date.now()}`,
        farmerId: farmer.id,
        title: `Slot Confirmed: Token ${tokenNumber}`,
        message: `Slot confirmed at ${selectedCentre.name} for ${formData.date} at ${formData.timeSlot}.`,
        type: 'slot_confirmed',
        read: false,
        createdAt: 'Just now',
      },
      ...notifications,
    ];

    persistAndBroadcast(
      updatedCentres,
      updatedQueue,
      procurement,
      newNotifications,
      `Booked ${tokenNumber}`
    );

    return tokenNumber;
  }, [farmer, queue, centres, selectedCentre.name, notifications, persistAndBroadcast, procurement]);

  // DEMO RESET BUTTON - Restores initial demonstration state
  const resetDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.CENTRES);
    localStorage.removeItem(STORAGE_KEYS.QUEUE);
    localStorage.removeItem(STORAGE_KEYS.PROCUREMENT);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.FARMER);

    setFarmer(INITIAL_FARMER);
    setCentres(INITIAL_CENTRES);
    setQueue(INITIAL_QUEUE);
    setProcurement(INITIAL_PROCUREMENT);
    setNotifications(INITIAL_NOTIFICATIONS);

    if (syncChannel) {
      syncChannel.postMessage({
        type: 'STATE_UPDATED',
        timestamp: Date.now(),
        message: 'RESET_DEMO',
      });
    }

    setToast({
      id: Date.now().toString(),
      type: 'info',
      title: 'Demo State Reset',
      message: 'Queue reset to Token #A-038 (Current) & #A-047 (Ramesh Kumar, 9 ahead).',
    });
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    const updated = notifications.map(n => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  }, [notifications]);

  const markAllNotificationsAsRead = useCallback(() => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
  }, [notifications]);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const value = {
    role,
    setRole,
    farmer,
    officer,
    centres,
    selectedCentre,
    setSelectedCentre,
    queue,
    currentToken,
    farmerToken,
    farmersAhead,
    estimatedWaitMinutes,
    procurement,
    notifications,
    unreadCount,
    toast,
    clearToast,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    callNextToken,
    updateProcurementStep,
    bookSlot,
    resetDemo,
    getCongestionLevel,
  };

  return <KisanContext.Provider value={value}>{children}</KisanContext.Provider>;
};

export const useKisan = (): KisanContextType => {
  const context = useContext(KisanContext);
  if (!context) {
    throw new Error('useKisan must be used within a KisanProvider');
  }
  return context;
};
