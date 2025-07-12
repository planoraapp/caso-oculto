
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';
import { useUserPacks } from '../../hooks/useUserPacks';

interface LibraryDebugPanelProps {
  user: any;
}

const LibraryDebugPanel: React.FC<LibraryDebugPanelProps> = ({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { userPacks, loading, error } = useUserPacks(user);

  if (!user || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg max-w-md z-50">
      <div 
        className="flex items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span className="ml-2 font-semibold">Library Debug</span>
        <RefreshCw 
          size={14} 
          className="ml-2 cursor-pointer hover:text-blue-400"
          onClick={(e) => {
            e.stopPropagation();
            window.location.reload();
          }}
        />
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-2 text-sm">
          <div>
            <strong>User ID:</strong> {user.id}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Error:</strong> {error || 'None'}
          </div>
          <div>
            <strong>Packs Count:</strong> {userPacks.length}
          </div>
          
          {userPacks.length > 0 && (
            <div>
              <strong>Packs:</strong>
              <ul className="ml-4 mt-1">
                {userPacks.map(pack => (
                  <li key={pack.id} className="text-xs">
                    {pack.id} - {pack.name} ({pack.cases?.length || 0} cases)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LibraryDebugPanel;
