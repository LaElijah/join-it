import styles from "@/app/_styles/components/settings/optionGroup.module.scss";

type OptionGroup = {
  label: string;
  options: string[];
};

interface OptionGroupProps extends OptionGroup {
  setPage: (option: string) => void;
  page: string;
  onClick?: (option: string) => void
}

export default function OptionGroup({
  label,
  options,
  page,
  setPage,
  onClick
}: OptionGroupProps) {
  return (
    <div key={label}>
      <h3>{label}</h3>

      <div key={label} className={styles.group}>
        {options.map((option) => {
          return (
            <div
              key={option}
              onClick={() => {
                if (onClick) onClick(option)
                setPage(option)
                
              }}
              className={option === page ? styles.activeOption : styles.option}
            >
              <h2>{option}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
