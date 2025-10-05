import React, { useState } from 'react';
import './Category.css'

export const categories = [
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
];

function Category({ setFormObject, formObject }) {

  const [isOpen, setIsOpen] = useState(false);

  /*
  Health & Fitness 🏋️‍♂️ (e.g., Exercise, Yoga, Running)
  Productivity & Work 📑 (e.g., Study, Deep Work, Learning)
  Mindfulness & Mental Health 🧘‍♂️ (e.g., Meditation, Gratitude, Journaling)
  Diet & Nutrition 🥗 (e.g., Drink Water, Eat Fruits, Avoid Junk Food)
  Personal Growth 📖 (e.g., Read Books, Learn a Skill, Public Speaking)
  Social & Relationships 💬 (e.g., Call Family, Meet Friends, Volunteering)
  Finance & Budgeting 💰 (e.g., Save Money, Track Expenses, No Unnecessary Spending)
  Hobbies & Creativity 🎨 (e.g., Music, Painting, Writing)
  Self-Care & Well-being 🛁 (e.g., Sleep Early, Skincare, Reduce Screen Time)
  Custom ✏️ (Users can type their own category)
  */
  const handleSelect = (category) => {
    setFormObject((prev) => { return { ...prev, 'Category': category } });
    // setFormObject(category);
    // console.log(category);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container">
      <h2>Category</h2>
      <div className={`custom-select ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <span>{formObject.Category || "Select a category"}</span>
        <div className="arrow"></div>
      </div>
      {isOpen && (
        <div className="dropdown">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`dropdown-item ${formObject.Category === category ? "selected" : ""}`}
              onClick={() => handleSelect(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;