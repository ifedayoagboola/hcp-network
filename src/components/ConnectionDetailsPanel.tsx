
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Link, HCP } from '../data/mockGraph';

interface ConnectionDetailsPanelProps {
  link: Link | null;
  sourceHcp: HCP | null;
  targetHcp: HCP | null;
  isOpen: boolean;
  onClose: () => void;
  position?: { x: number; y: number };
}

const ConnectionDetailsPanel: React.FC<ConnectionDetailsPanelProps> = ({
  link,
  sourceHcp,
  targetHcp,
  isOpen,
  onClose,
  position
}) => {
  if (!isOpen || !link || !sourceHcp || !targetHcp) {
    return null;
  }

  const getConnectionDetails = () => {
    switch (link.type) {
      case 'co-authorship':
        return {
          title: 'Co-authored Publications',
          icon: '📚',
          details: [
            'Cardiovascular Research Advances (2023)',
            'Clinical Cardiology Today (2022)',
            'Heart Health Journal (2021)'
          ]
        };
      case 'shared_workplace':
        return {
          title: 'Shared Workplace',
          icon: '🏥',
                     details: [
             `${sourceHcp.experience?.[0] || 'Unknown workplace'} (2020-2023)`,
             'Collaborated on patient care protocols',
             'Joint research initiatives'
           ]
        };
      case 'education':
        return {
          title: 'Educational Connection',
          icon: '🎓',
                     details: [
             `${sourceHcp.education?.[0] || 'Unknown institution'} (2015-2019)`,
             'Same graduating class',
             'Research collaboration during studies'
           ]
        };
      case 'research':
        return {
          title: 'Research Collaboration',
          icon: '🔬',
          details: [
            'NIH-funded cardiovascular study (2022)',
            'Clinical trial participation',
            'Peer-reviewed publications'
          ]
        };
      default:
        return {
          title: 'Professional Connection',
          icon: '🤝',
          details: [
            'Healthcare network collaboration',
            'Professional development events',
            'Industry conference participation'
          ]
        };
    }
  };

  const connectionInfo = getConnectionDetails();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4">
      <div 
        className="bg-white rounded-xl md:rounded-2xl shadow-xl max-w-sm md:max-w-md w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden"
        style={{
          position: 'absolute',
          left: position ? Math.min(position.x, window.innerWidth - 320) : '50%',
          top: position ? Math.min(position.y, window.innerHeight - 400) : '50%',
          transform: position ? 'none' : 'translate(-50%, -50%)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2 md:space-x-3">
            <span className="text-xl md:text-2xl">{connectionInfo.icon}</span>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">{connectionInfo.title}</h3>
              <p className="text-xs md:text-sm text-gray-500">{link.type.replace('_', ' ')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        {/* Connection Info */}
        <div className="p-4 md:p-6">
          <div className="flex items-center space-x-2 md:space-x-4 mb-4 md:mb-6">
            <img
              src={sourceHcp.avatarUrl}
              alt={sourceHcp.name}
              className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://randomuser.me/api/portraits/lego/1.jpg';
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm md:text-base truncate">{sourceHcp.name || 'Unknown HCP'}</div>
              <div className="text-xs md:text-sm text-gray-500 truncate">{sourceHcp.education?.[0] || 'No education info'}</div>
            </div>
            <div className="text-gray-300 text-sm md:text-base">→</div>
            <img
              src={targetHcp.avatarUrl}
              alt={targetHcp.name}
              className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://randomuser.me/api/portraits/lego/1.jpg';
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm md:text-base truncate">{targetHcp.name || 'Unknown HCP'}</div>
              <div className="text-xs md:text-sm text-gray-500 truncate">{targetHcp.education?.[0] || 'No education info'}</div>
            </div>
          </div>

          {/* Connection Details */}
          <div className="space-y-3 md:space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Connection Details</h4>
              <p className="text-gray-600 text-xs md:text-sm">{link.detail || 'No details available'}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Collaborations</h4>
              <ul className="space-y-1 md:space-y-2">
                {connectionInfo.details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-xs md:text-sm text-gray-600">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="font-medium text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Timeline</h4>
              <div className="space-y-1 md:space-y-2">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs md:text-sm text-gray-600">2023: Current collaboration</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-xs md:text-sm text-gray-600">2022: Research partnership</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-xs md:text-sm text-gray-600">2021: Initial connection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg md:rounded-xl hover:bg-blue-700 transition-colors text-sm md:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionDetailsPanel; 