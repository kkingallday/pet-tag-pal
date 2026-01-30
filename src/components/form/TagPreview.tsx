import { cn } from '@/lib/utils';

interface TagPreviewProps {
  shape: string;
  material: string;
  size: string;
  petName: string;
  petNameCase: 'uppercase' | 'mixed';
  frontLine1: string;
  frontLine2?: string;
}

const getMaterialColor = (material: string) => {
  switch (material) {
    case 'brass':
      return 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600';
    case 'stainless':
      return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500';
    case 'pink_silver':
      return 'bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500';
    default:
      return 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600';
  }
};

const getShapeClasses = (shape: string, size: string) => {
  const baseSize = size === 'large' ? 'w-32 h-32' : 'w-24 h-24';
  
  switch (shape) {
    case 'Round':
      return `${baseSize} rounded-full`;
    case 'Bone':
      return size === 'large' ? 'w-40 h-20' : 'w-32 h-16';
    case 'Heart':
      return baseSize;
    default:
      return `${baseSize} rounded-full`;
  }
};

const BoneShape = ({ material, size, children }: { material: string; size: string; children: React.ReactNode }) => {
  const dimensions = size === 'large' ? 'w-40 h-20' : 'w-32 h-16';
  const circleSize = size === 'large' ? 'w-8 h-8' : 'w-6 h-6';
  const materialColor = getMaterialColor(material);
  
  return (
    <div className={cn('relative flex items-center justify-center', dimensions)}>
      {/* Main bone body */}
      <div className={cn('absolute inset-y-2 inset-x-4 rounded-full', materialColor, 'shadow-lg')} />
      {/* Left bone ends */}
      <div className={cn('absolute left-0 top-0', circleSize, 'rounded-full', materialColor, 'shadow-lg')} />
      <div className={cn('absolute left-0 bottom-0', circleSize, 'rounded-full', materialColor, 'shadow-lg')} />
      {/* Right bone ends */}
      <div className={cn('absolute right-0 top-0', circleSize, 'rounded-full', materialColor, 'shadow-lg')} />
      <div className={cn('absolute right-0 bottom-0', circleSize, 'rounded-full', materialColor, 'shadow-lg')} />
      {/* Text overlay */}
      <div className="relative z-10 text-center px-2">
        {children}
      </div>
    </div>
  );
};

const HeartShape = ({ material, size, children }: { material: string; size: string; children: React.ReactNode }) => {
  const dimensions = size === 'large' ? 'w-32 h-32' : 'w-24 h-24';
  const materialColor = getMaterialColor(material);
  
  return (
    <div className={cn('relative flex items-center justify-center', dimensions)}>
      <div 
        className={cn('absolute inset-0', materialColor, 'shadow-lg')}
        style={{
          clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
          transform: 'scale(1.3)',
          transformOrigin: 'center',
        }}
      />
      {/* Simpler heart using CSS */}
      <div 
        className={cn('absolute inset-0', materialColor, 'shadow-lg')}
        style={{
          clipPath: 'polygon(50% 100%, 0% 35%, 25% 0%, 50% 15%, 75% 0%, 100% 35%)',
        }}
      />
      <div className="relative z-10 text-center px-3 pt-4">
        {children}
      </div>
    </div>
  );
};

export function TagPreview({ 
  shape, 
  material, 
  size, 
  petName, 
  petNameCase,
  frontLine1,
  frontLine2 
}: TagPreviewProps) {
  const displayName = petNameCase === 'uppercase' ? petName.toUpperCase() : petName;
  const displayLine1 = petNameCase === 'uppercase' ? frontLine1.toUpperCase() : frontLine1;
  const displayLine2 = frontLine2 ? (petNameCase === 'uppercase' ? frontLine2.toUpperCase() : frontLine2) : '';
  
  const textSize = size === 'large' ? 'text-xs' : 'text-[10px]';
  const nameSize = size === 'large' ? 'text-sm font-bold' : 'text-xs font-bold';
  
  const textContent = (
    <div className={cn('text-gray-800 leading-tight', textSize)}>
      <div className={nameSize}>{displayName || 'Pet Name'}</div>
      {(frontLine1 || frontLine2) && (
        <div className="mt-0.5 opacity-80">
          {displayLine1 && <div>{displayLine1}</div>}
          {displayLine2 && <div>{displayLine2}</div>}
        </div>
      )}
    </div>
  );

  if (shape === 'Bone') {
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium">Preview</span>
        <BoneShape material={material} size={size}>
          {textContent}
        </BoneShape>
      </div>
    );
  }

  if (shape === 'Heart') {
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium">Preview</span>
        <HeartShape material={material} size={size}>
          {textContent}
        </HeartShape>
      </div>
    );
  }

  // Round (default)
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs text-muted-foreground font-medium">Preview</span>
      <div 
        className={cn(
          getShapeClasses(shape, size),
          getMaterialColor(material),
          'flex items-center justify-center shadow-lg border-2 border-white/30'
        )}
      >
        {textContent}
      </div>
    </div>
  );
}
