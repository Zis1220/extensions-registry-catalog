import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

export function useTheme() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return {
    scheme: computedColorScheme,
    toggle: () => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light'),
  };
}
