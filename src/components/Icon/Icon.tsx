import Icons from "../../assets/svg/icons.svg";

interface IIconProps {
  id: string;
  size?: number;
  className?: string;
  fill?: string;
  stroke?: string;
  color?: string;
}

export const Icon: React.FC<IIconProps> = ({
  id,
  size,
  className,
  fill,
  stroke,
  color,
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      fill={fill}
      stroke={stroke}
      style={{ color }}
    >
      <use href={`${Icons}#icon-${id}`} />
    </svg>
  );
};
