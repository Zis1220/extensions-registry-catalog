import type { ReactNode } from 'react';

import { Alert, type AlertProps } from '@mantine/core';
import {
  type Icon,
  IconAlertTriangle,
  IconCheck,
  IconInfoCircle,
  IconX,
} from '@tabler/icons-react';

type StatusAlertStatus = 'error' | 'info' | 'neutral' | 'success' | 'warning';

interface StatusAlertProps extends Omit<AlertProps, 'children' | 'color' | 'icon'> {
  children: ReactNode;
  compact?: boolean;
  status?: StatusAlertStatus;
}

const statusConfig: Record<StatusAlertStatus, { color: string; Icon: Icon }> = {
  error: { color: 'red', Icon: IconX },
  info: { color: 'blue', Icon: IconInfoCircle },
  neutral: { color: 'gray', Icon: IconInfoCircle },
  success: { color: 'teal', Icon: IconCheck },
  warning: { color: 'yellow', Icon: IconAlertTriangle },
};

export function StatusAlert({
  children,
  closeButtonLabel,
  compact = false,
  status = 'info',
  withCloseButton,
  ...props
}: StatusAlertProps) {
  const { color, Icon } = statusConfig[status];
  const spacingProps = compact ? { px: 'sm', py: 'xs' } : {};
  const closeButtonProps = {
    ...(withCloseButton !== undefined ? { withCloseButton } : {}),
    ...(closeButtonLabel !== undefined || withCloseButton
      ? { closeButtonLabel: closeButtonLabel ?? 'Dismiss alert' }
      : {}),
  };

  return (
    <Alert
      variant={status === 'neutral' ? 'default' : 'light'}
      {...spacingProps}
      {...props}
      {...closeButtonProps}
      color={color}
      icon={<Icon size={compact ? 16 : 18} />}
    >
      {children}
    </Alert>
  );
}
