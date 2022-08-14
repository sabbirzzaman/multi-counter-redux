// select elements
const counterCardsEl = document.getElementById('counter-cards');
const addNewCardBtn = document.getElementById('add-new-card');
const resetBtn = document.getElementById('reset');
const removeBtn = document.getElementById('remove');

// action identifier
const ADD_CARD = 'add-card';
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const RESET = 'reset';
const REMOVE = 'remove';

// create action
const newCard = () => {
    return {
        type: ADD_CARD,
    };
};

const increment = (id, value) => {
    return {
        type: INCREMENT,
        payload: {
            id, value
        },
    };
};

const decrement = (id, value) => {
    return {
        type: DECREMENT,
        payload: {
            id, value
        },
    };
};

const resetCounters = () => {
    return {
        type: RESET,
    };
};

const removeCounters = () => {
    return {
        type: REMOVE,
    }
}

// initial state
const initialState = [
    {
        id: 1,
        counter: 0,
    },
];

// create reducer functions
function reducer(state = initialState, action) {
    if (action.type === ADD_CARD) {
        return [
            ...state,
            {
                id: state.length ? state.reduce(function(maxId, card) { return Math.max(card.id, maxId); }, -1) + 1 : 0,
                counter: 0,
            },
        ];
    } else if (action.type === INCREMENT) {
        const updatedState = [...state];
        
        updatedState.map((card) => {
            if(card.id === parseInt(action.payload.id)) {
                const newValue = card.counter + action.payload.value;

                card.counter = newValue;
            }
        })
        
        return updatedState;
    } else if (action.type === DECREMENT) {
        const updatedState = [...state];
        
        updatedState.map((card) => {
            if(card.id === parseInt(action.payload.id)) {
                const newValue = card.counter - action.payload.value;

                card.counter = newValue;
            }
        })
        
        return updatedState;
    } else if (action.type === RESET) {
        const updatedState = [...state];
        
        updatedState.map((cards) => {
            console.log(cards)
                cards.counter = 0;
        })
        
        return updatedState;
    } else if (action.type === REMOVE) {
        const updatedState = [...state];
        
        updatedState.pop()
        
        return updatedState;
    } else {
        return state;
    }
}

// create store
const cardStore = Redux.createStore(reducer);

function cardRender() {
    const state = cardStore.getState();

    // remove text content
    counterCardsEl.textContent = '';

    state.forEach((card) => {
        // create card element
        const cardItem = document.createElement('div');

        // add class list
        cardItem.classList.add(
            'p-4',
            'h-auto',
            'flex',
            'flex-col',
            'items-center',
            'justify-center',
            'space-y-5',
            'bg-white',
            'rounded',
            'shadow',
            'mt-4'
        );

        cardItem.innerHTML = `
        <div class="text-2xl font-semibold">${card.counter}</div>
            <div id="${card.id}" class="flex space-x-3">
                <button
                    class="increment bg-indigo-400 text-white px-3 py-2 rounded shadow"
                >
                    Increment
                </button>
                <button
                    class="decrement bg-red-400 text-white px-3 py-2 rounded shadow"
                >
                    Decrement
                </button>
            </div>`;

        // append card to main container
        counterCardsEl.appendChild(cardItem); 
    });
}

// initially call render
cardRender();

cardStore.subscribe(cardRender);

// button handler
addNewCardBtn.addEventListener('click', () => {
    cardStore.dispatch(newCard());
});

counterCardsEl.addEventListener('click', (e) => {
    const card = e.target;
    const id = card.parentNode.id;
    const value = parseInt(id) + 2;

    if(card.classList[0] === 'increment') {
        cardStore.dispatch(increment(id, value))
    }

    if(card.classList[0] === 'decrement') {
        cardStore.dispatch(decrement(id, value))
    }
})

resetBtn.addEventListener('click', () => {
    cardStore.dispatch(resetCounters())
})

removeBtn.addEventListener('click', () => {
    cardStore.dispatch(removeCounters())
})
