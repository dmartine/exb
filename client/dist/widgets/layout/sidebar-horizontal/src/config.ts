import { IMSidebarConfig, CollapseSides, SidebarControllerPositions } from 'jimu-layouts/sidebar-runtime';
import { Immutable } from 'jimu-core';

export const defaultConfig: IMSidebarConfig = Immutable({
  collapseSide: CollapseSides.First,
  overlay: false,
  size: '300px',
  divider: {
    visible: true,
  },
  resizable: false,
  toggleBtn: {
    visible: true,
    icon: 'arrow-left-14',
    offsetX: 15,
    offsetY: 0,
    position: SidebarControllerPositions.Center,
    iconSize: 14,
    width: 15,
    height: 60,
    color: {
      normal: {
        icon: {
          useTheme: false,
          color: '#FFFFFF',
        },
        bg: {
          useTheme: true,
          color: 'colors.primary',
        },
      },
      hover: {
        bg: {
          useTheme: true,
          color: 'colors.indigos.indigo500',
        },
      },
    },
    expandStyle: {
      style: {
        borderRadius: '0 92px 92px 0',
      },
    },
    collapseStyle: {
      style: {
        borderRadius: '0 92px 92px 0',
      },
    },
  },
  defaultState: 1,
});
