import { useTheme } from '../hooks/useTheme';
import { styled } from '../stitches.config';

export const IconsBackground = ({ className }: { className?: string }) => {
  const { isDark } = useTheme();
  return (
    <Image
      className={className}
      aria-hidden="true"
      alt="background icons"
      src={require('./icons.png')}
      theme={isDark ? 'dark' : 'light'}
    />
  );
};

const Image = styled('img', {
  absoluteFill: 0,
  zIndex: -1,
  overflow: 'hidden',
  transform: 'rotate(-35deg) translateY(-750px)',
  variants: {
    theme: {
      light: {
        opacity: 0.2,
      },
      dark: {
        opacity: 0.1,
      },
    },
  },
});
