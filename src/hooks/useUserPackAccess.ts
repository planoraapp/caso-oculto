
import { useState, useEffect } from 'react';
import { getUserPacks } from '../utils/packUtils';

export const useUserPackAccess = (userId: string | undefined) => {
  const [userPackIds, setUserPackIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUserPacks = async () => {
      try {
        const packIds = await getUserPacks(userId);
        setUserPackIds(packIds);
      } catch (error) {
        console.error('Error fetching user packs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPacks();
  }, [userId]);

  const hasAccess = (packId: string) => userPackIds.includes(packId);
  const isAdmin = (userEmail?: string) => userEmail === 'conectawebapps@outlook.com';

  return { userPackIds, loading, hasAccess, isAdmin };
};
