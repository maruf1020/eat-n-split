import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Sabbir",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -700,
  },
  {
    id: 933372,
    name: "Siam",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 2000,
  },
  {
    id: 499476,
    name: "Saif",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
  {
    id: 499776,
    name: "Miraz",
    image: "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/25/832871/1.jpg?6972",
    balance: 20000,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

export default function App() {

  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((curr) => !curr)
  }

  function handleAddFriend(newFriend) {
    setFriends((curr) => [...curr, newFriend]);
    setShowAddFriend(false);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend((curr) => curr?.id === friend.id ? null : friend);
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">

        <FriendList friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
        />

        {showAddFriend &&
          <FromAddFriend onAddFriend={handleAddFriend} />
        }

        <Button
          onClick={handleShowAddFriend}>
          {!showAddFriend ? 'Add Friend' : 'Close'}
        </Button>

      </div>
      {selectedFriend &&
        <FromSplitBill selectedFriend={selectedFriend} />
      }
    </div>
  )
}

function FriendList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  )
}

function Friend({ friend, selectedFriend, onSelectFriend }) {

  // const isSelected = selectedFriend?.id === friend.id;
  const isSelected = selectedFriend && selectedFriend.id === friend.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">You owe {friend.name} {Math.abs(friend.balance)}৳</p>
      )}
      {friend.balance > 0 && (
        <p className="green">{friend.name} owes you {Math.abs(friend.balance)}৳</p>
      )}
      {friend.balance === 0 && (
        <p>You and {friend.name} are even</p>
      )}

      <Button onClick={() => onSelectFriend(friend)}>{isSelected ? 'Close' : 'Select'}</Button>

    </li>
  )
}

function FromAddFriend({ onAddFriend }) {

  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👨🏻‍🤝‍👩🏿Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>📸 Image URL</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

      <Button>Add</Button>

    </form>
  )
}

function FromSplitBill({ selectedFriend }) {

  const [bill, setBill] = useState("");
  const [myUserExpense, setUserExpense] = useState("");
  const friendExpense = Number(bill) - Number(myUserExpense);
  const [selectBillPay, setSelectBillPay] = useState("Me");

  return (
    <form className="form-split-bill">
      <h2>Split Bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))} />

      <label>🕴️Your Expense</label>
      <input
        type="text"
        value={myUserExpense}
        onChange={(e) => setUserExpense((curr) => Number(e.target.value) > bill ? Number(curr) : Number(e.target.value))} />

      <label>👨🏻‍🤝‍👩🏿{selectedFriend.name}'s expense</label>
      <input disabled type="text" value={friendExpense} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={selectBillPay}
        onChange={(e) => setSelectBillPay(e.target.value)}>
        <option>Me</option>
        <option>{selectedFriend.name}</option>
      </select>

      <Button>Add</Button>
    </form>
  )
}