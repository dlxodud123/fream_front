import React, { useState, useEffect } from 'react';
import './shop.css';

const FilterComponent = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    category: {
      신발: true,
      // 스니커즈: false,
      // 샌들: false,
      // 플랫: false,
      // 로퍼: false,
      // 패션잡화: false,
      // 컬렉터블: false,
      // 뷰티: false,
      // 테크: false,
      // 캠핑: false,
    },
    gender: {
      MAN: false,
      WOMAN: false,
    },
    brand: {
      Adidas: false,
      Oofos: false,
      'Dr.Martens': false,
      UGG: false,
      Alexander: false,
      Keen: false,
      Crocs: false,
      Vans: false,
      Nike: false,
      Hermes: false,
      Fila: false,
      'New Balance': false,
      Salomon: false,
      OOFOS: false,
      Chloe: false,
      Asics: false,
      Timberland: false,
      Jordan: false,
      TawToe: false,
      Hoka: false,
      Birkenstock: false,
    },
    color: {
      Beige: false,
      Black: false,
      Blue: false,
      Brown: false,
      Gold: false,
      Green: false,
      Grey: false,
      Navy: false,
      Orange: false,
      Pink: false,
      Purple: false,
      Red: false,
      Silver: false,
      White: false,
      Yellow: false,
    },
  });

  const [categoryVisible, setCategoryVisible] = useState(true);
  const [genderVisible, setGenderVisible] = useState(true);
  const [makerVisible, setMakerVisible] = useState(true);
  const [colorVisible, setColorVisible] = useState(true);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: {
        ...prevFilters.category,
        [name]: checked,
      },
    }));
  };

  const handleGenderChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      gender: {
        ...prevFilters.gender,
        [name]: checked,
      },
    }));
  };

  const handleMakerChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      brand: {
        ...prevFilters.brand,
        [name]: checked,
      },
    }));
  };

  const handleColorChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      color: {
        ...prevFilters.color,
        [name]: checked,
      },
    }));
  };

  const toggleVisibility = (setVisibilityFunc, visibility) => {
    setVisibilityFunc(!visibility);
  };

  return (
    <div className="filter-container">
      <div className="filter-header">필터</div>

      <div className="filter-section">
        <h3>
          카테고리
          <button className="toggle-button" onClick={() => toggleVisibility(setCategoryVisible, categoryVisible)}>
            {categoryVisible ? '-' : '+'}
          </button>
        </h3>
        {categoryVisible && (
          <div className="filter-group">
            {Object.keys(filters.category).map((key) => (
              <label key={key}>
                <input
                  type="checkbox"
                  name={key}
                  checked={filters.category[key]}
                  onChange={handleCategoryChange}
                />
                {key}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <h3>
          성별
          <button className="toggle-button" onClick={() => toggleVisibility(setGenderVisible, genderVisible)}>
            {genderVisible ? '-' : '+'}
          </button>
        </h3>
        {genderVisible && (
          <div className="filter-group">
            {Object.keys(filters.gender).map((key) => (
              <label key={key}>
                <input
                  type="checkbox"
                  name={key}
                  checked={filters.gender[key]}
                  onChange={handleGenderChange}
                />
                {key}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <h3>
          메이커
          <button className="toggle-button" onClick={() => toggleVisibility(setMakerVisible, makerVisible)}>
            {makerVisible ? '-' : '+'}
          </button>
        </h3>
        {makerVisible && (
          <div className="filter-group">
            {Object.keys(filters.brand).map((key) => (
              <label key={key}>
                <input
                  type="checkbox"
                  name={key}
                  checked={filters.brand[key]}
                  onChange={handleMakerChange}
                />
                {key}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="filter-section">
        <h3>
          색상
          <button className="toggle-button" onClick={() => toggleVisibility(setColorVisible, colorVisible)}>
            {colorVisible ? '-' : '+'}
          </button>
        </h3>
        {colorVisible && (
          <div className="filter-group">
            {Object.keys(filters.color).map((key) => (
              <label key={key}>
                <input
                  type="checkbox"
                  name={key}
                  checked={filters.color[key]}
                  onChange={handleColorChange}
                />
                {key}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
