export default function TabButtons({ petData }) {
    return (
      <div className="tab__header">
        {petData.map((item, index) => (
                 <li
            className={`tab__button`}
            key={item.animal}
                   >
            {item.animal}
          </li>
        ))}
      </div>
    );
  }
  