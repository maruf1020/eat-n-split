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
    id: 499476,
    name: "Miraz",
    image: "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/25/832871/1.jpg?6972",
    balance: 20000,
  },
];


export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <FromAddFriend />
        <Button>Add Friend</Button>
      </div>
      <FromSplitBill />
    </div>
  )
}

function FriendList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  )
}

function Friend({ friend }) {
  return (
    <li>
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

      <Button>Select</Button>

    </li>
  )
}

function Button({ children }) {
  return (
    <button className="button">{children}</button>
  )
}


function FromAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👨🏻‍🤝‍👩🏿Name</label>
      <input type="text" />

      <label>📸 Image URL</label>
      <input type="text" />

      <Button>Add</Button>

    </form>
  )
}

function FromSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split Bill with X</h2>

      <label>💰 Bill Value</label>
      <input type="text" />

      <label>🕴️Your Expense</label>
      <input type="text" />

      <label>👨🏻‍🤝‍👩🏿X's expense</label>
      <input disabled type="text" />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option>Me</option>
        <option>X</option>
      </select>

      <Button>Add</Button>
    </form>
  )
}