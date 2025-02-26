import React from 'react';

/**
 * Props para el componente Loading
 */
interface LoadingProps {
  /** Tema del componente (claro u oscuro) */
  theme?: 'light' | 'dark';
  /** Texto a mostrar junto al spinner */
  text?: string;
  /** Tamaño del spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Clase CSS adicional para el contenedor */
  className?: string;
}

/**
 * Componente de carga que muestra un spinner y un texto opcional
 * Se adapta automáticamente a fondos claros u oscuros según el tema especificado
 */
const Loading: React.FC<LoadingProps> = ({ 
  theme = 'light', 
  text = 'Cargando...', 
  size = 'md',
  className = ''
}) => {
  // Configuración de colores según el tema
  const colors = {
    light: {
      text: 'text-gray-700',
      border: 'border-gray-300 border-t-gray-700'
    },
    dark: {
      text: 'text-white',
      border: 'border-white border-t-transparent'
    }
  };

  // Configuración de tamaños
  const sizes = {
    sm: {
      spinner: 'h-4 w-4',
      text: 'text-xs'
    },
    md: {
      spinner: 'h-5 w-5',
      text: 'text-sm'
    },
    lg: {
      spinner: 'h-8 w-8',
      text: 'text-base'
    }
  };

  // Seleccionar configuración según props
  const colorConfig = colors[theme];
  const sizeConfig = sizes[size];

  return (
    <div className={`flex justify-center items-center h-full ${className}`}>
      <div 
        className={`animate-spin rounded-full ${sizeConfig.spinner} border-2 ${colorConfig.border}`}
        aria-hidden="true"
      />
      {text && (
        <span className={`ml-2 ${sizeConfig.text} ${colorConfig.text} font-medium`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default Loading;
