import React from 'react';

interface ISelectedDrink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  // ... any other properties specific to a drink
}

// Props it is going to receive
interface IDrinkDetailsModalProps {
  drink: ISelectedDrink;
  onClose: () => void;
}

// Setting that this componenet is going to receieve props
const CocktailModal: React.FC<IDrinkDetailsModalProps> = ({ drink, onClose }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>{drink.idDrink}</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default CocktailModal;
