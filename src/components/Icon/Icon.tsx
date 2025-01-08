import Icons from "../../assets/svg/icons.svg";

interface IIconProps {
  id: string;
  size?: number;
  className?: string;
  color?: string;
}

export const Icon: React.FC<IIconProps> = ({ id, size, className, color }) => {
  return (
    <svg width={size} height={size} className={className} style={{ color }}>
      <use href={`${Icons}#icon-${id}`} />
    </svg>
  );
};
