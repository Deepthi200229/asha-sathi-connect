import { useState, useEffect } from 'react';

export const usePermissions = () => {
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [notificationPermission, setNotificationPermission] = useState<'granted' | 'denied' | 'default'>('default');

  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    // Check location permission
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state as 'granted' | 'denied' | 'prompt');
        result.onchange = () => {
          setLocationPermission(result.state as 'granted' | 'denied' | 'prompt');
        };
      });
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      setLocationPermission('granted');
      return true;
    } catch {
      setLocationPermission('denied');
      return false;
    }
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      return false;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    return permission === 'granted';
  };

  return {
    locationPermission,
    notificationPermission,
    requestLocationPermission,
    requestNotificationPermission,
  };
};
