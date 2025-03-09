import { useState } from 'react';
import './Filter.css';

function Filter({ setHabitData, updatedStreakData, showFilter, setShowFilter, selectedFrequencies, setSelectedFrequencies, selectedBadges, setSelectedBadges, }) {

  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleFilterHabit = () => {

    const copy_inside = [...updatedStreakData];

    if (selectedFrequencies.length === 0 && selectedBadges.length === 0) {
      console.log('empty');
    } else {

      if (selectedFrequencies.length > 0 && selectedBadges.length > 0) {
        // console.log('both');
        setHabitData(copy_inside.filter(habit =>
          selectedFrequencies.includes(habit.Frequency) &&
          selectedBadges.includes(habit.BadgeRecord.Badge)))
      } else if (selectedFrequencies.length > 0) {
        // console.log('Frequency');
        setHabitData(copy_inside.filter(habit => selectedFrequencies.includes(habit.Frequency)));
      } else if (selectedBadges.length > 0) {
        // console.log('Badge');
        setHabitData(copy_inside.filter(habit => selectedBadges.includes(habit.BadgeRecord.Badge)));
      }
    }
  };

  const handleFilterReset = () => {
    setSelectedFrequencies([]);
    setSelectedBadges([]);
    setSelectedCategory([]);
  }

  const handleFrequencyChange = (event) => {
    const { value, checked } = event.target;

    setSelectedFrequencies(prev =>
      checked ? [...prev, value] : prev.filter(f => f !== value)
    );
  };


  const handleBadgeChange = (event) => {
    const { value, checked } = event.target;

    setSelectedBadges(prev =>
      checked ? [...prev, value] : prev.filter(b => b !== value)
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const categories = [
    "Health & Fitness 🏋️‍♂️",
    "Productivity & Work 📑",
    "Mindfulness & Mental Health 🧘‍♂️",
    "Diet & Nutrition 🥗",
    "Personal Growth 📖",
    "Social & Relationships 💬",
    "Finance & Budgeting ",
    "Hobbies & Creativity 🎨 ",
    "Self - Care & Well - being 🛁",
    "Custom ✏️"
  ];

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategory(prev =>
      checked ? [...prev, value] : prev.filter(b => b !== value)
    );
  };

  const handleRemoveSelctedCat = (indexToRemove) => {
    setSelectedCategory(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <div className="filter-container" data-visible={showFilter}>

        <div className="custom-select-container">
          <h2>Category</h2>
          <div className={`custom-select-category ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
            <span>{selectedCategory.length > 0 ? <>
              {selectedCategory.map((category, index) => {
                return <div key={index} className='selected-category'>
                  {category.split(" ")[0]}
                  <span onClick={(event) => {
                    event.stopPropagation();
                    handleRemoveSelctedCat(index)}} >X</span>
                </div>
              })}
            </> : "Select a category"}</span>
            <div className="arrow"></div>
          </div>
          {isOpen && (
            <>
              <div className='filter-category-search'>
                <input type="text" placeholder='Search .....' />
              </div>
              <div className="dropdown-category">
                {categories.map((category, index) => (
                  <div key={index} className={`dropdown-item-category ${selectedCategory === category ? "selected" : ""}`} >
                    <label>
                      <input type="checkbox" value={category}
                        checked={selectedCategory.includes(category)}
                        onChange={handleCategoryChange}
                      />
                      {category}
                    </label>

                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {/* Frequency */}
        <div className="filter-Frequency-habit">
          <h4>Frequency</h4>
          <label>
            <input type="checkbox" value="Daily"
              checked={selectedFrequencies.includes('Daily')}
              onChange={handleFrequencyChange}
            />
            Daily
          </label>
          <label>
            <input type="checkbox" value="Weekly"
              checked={selectedFrequencies.includes('Weekly')}
              onChange={handleFrequencyChange}
            />
            Weekly
          </label>
        </div>


        {/* Badge */}
        <div className="filter-Badge-habit">
          <h4>Badge</h4>
          <div>
            <label>
              <input
                type="checkbox"
                value="🥈 Silver Badge"
                checked={selectedBadges.includes("🥈 Silver Badge")}
                onChange={handleBadgeChange}
              />
              Silver Badge
            </label>
            <label>
              <input
                type="checkbox"
                value="🏆 Gold Badge"
                checked={selectedBadges.includes("🏆 Gold Badge")}
                onChange={handleBadgeChange}
              />
              Gold Badge
            </label>
            <label>
              <input
                type="checkbox"
                value="⚜️ Elite Badge"
                checked={selectedBadges.includes("⚜️ Elite Badge")}
                onChange={handleBadgeChange}
              />
              Elite Badge
            </label>
          </div>
        </div>

        <div className="filter-button-box">
          <button onClick={() => {
            handleFilterHabit();
            setShowFilter(false)
          }
          } disabled={selectedFrequencies.length === 0 && selectedBadges.length === 0 && selectedCategory.length ===0 }> Apply </button>
          <button onClick={() => handleFilterReset()} >Reset</button>
        </div>

      </div >
    </>
  );
}

export default Filter;
