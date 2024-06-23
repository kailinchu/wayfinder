export default function TabContent({ petData}) {
    return (
      <div className="tab__container ">
        <div className="tab__content">
          {petData.map((pet) => (
            <div key={pet}>
              <img src={pet.image} alt="" />
              <p>{pet.fact}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  