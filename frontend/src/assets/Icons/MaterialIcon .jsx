const MaterialIcon = ({ name }) => {
    return (
      <span
        className="material-symbols-outlined"
        style={{
          fontVariationSettings: `'FILL' 0, 'wght' 200, 'GRAD' -25, 'opsz' 40`,
        }}
      >
        {name}
      </span>
    );
  };
  
  export default MaterialIcon;
  