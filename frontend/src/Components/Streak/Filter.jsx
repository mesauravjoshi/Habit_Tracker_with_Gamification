import { useState } from 'react';
import './Filter.css';

function Filter({ setHabitData, updatedStreakData, showFilter, setShowFilter, selectedFrequencies, setSelectedFrequencies, selectedBadges, setSelectedBadges, selectedCategory, setSelectedCategory }) {

  const handleFilterHabit = () => {

    const copy_inside = [...updatedStreakData];

    if (selectedFrequencies.length === 0 && selectedBadges.length === 0 && selectedCategory.length === 0) {
      // console.log('empty');
      return
    } else {

      if (selectedFrequencies.length > 0 && selectedBadges.length > 0 && selectedCategory.length > 0) {
        console.log('both');
        setHabitData(copy_inside.filter(habit =>
          selectedFrequencies.includes(habit.Frequency) &&
          selectedBadges.includes(habit.BadgeRecord.Badge))) &&
          selectedCategory.includes(habit.Category)
      } else if (selectedFrequencies.length > 0) {
        console.log('Frequency');
        setHabitData(copy_inside.filter(habit => selectedFrequencies.includes(habit.Frequency)));
      } else if (selectedBadges.length > 0) {
        console.log('Badge');
        setHabitData(copy_inside.filter(habit => selectedBadges.includes(habit.BadgeRecord.Badge)));
      } else if (selectedCategory.length > 0) {
        console.log('Category');
        setHabitData(copy_inside.filter(habit => selectedCategory.includes(habit.Category)));
      }
    }
    setShowFilter(false)
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
    // "Custom ✏️"
  ]

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategory(prev =>
      checked ? [...prev, value] : prev.filter(b => b !== value)
    );
  };

  const handleRemoveSelctedCat = (indexToRemove) => {
    setSelectedCategory(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories); // Store filtered results

  const filterCategorySearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 0) {
      const searchResults = categories.filter(cat => cat.toLowerCase().includes(query));
      setFilteredCategories(searchResults);
    } else {
      setFilteredCategories(categories); // Reset if input is empty
    }
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
                    handleRemoveSelctedCat(index)
                  }} >X</span>
                </div>
              })}
            </> : "Select a category"}</span>
            <div className="arrow"></div>
          </div>
          {isOpen && (
            <>
              <div className='filter-category-search'>
                <input type="text" placeholder="Search ....." onChange={filterCategorySearch} value={searchQuery} />
                <div className="dropdown-category">
                  {filteredCategories.map((category, index) => (
                    <div key={index} className={`dropdown-item-category ${selectedCategory.includes(category) ? "selected" : ""}`} >
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
          <button onClick={() => { handleFilterHabit(); }}
          // disabled={selectedFrequencies.length === 0 && selectedBadges.length === 0 && selectedCategory.length === 0}
          > Apply </button>
          <button onClick={() => handleFilterReset()} >Reset</button>
        </div>

      </div >
    </>
  );
}

export default Filter;
