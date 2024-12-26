import Icons from "../../assets/svg/icons.svg";

interface IIconProps {
  id: string;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IIconProps> = ({ id, size, className }) => {
  return (
    <svg width={size} height={size} className={className}>
      <use href={`${Icons}#icon-${id}`} />
    </svg>
  );
};
