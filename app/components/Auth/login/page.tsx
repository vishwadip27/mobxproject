import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'

const login = () => {
  const handleInput = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target.value;
    console.log(name, value);
    setUser({...user, [name]: value });
  }
  const createUserAPi = 'https://jsonplaceholder.typicode.com/users';
  const [error, setError] = useState(null);
  const [isLoading , setLoading] = useState(false);
  // const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    fetch(createUserAPi)
     .then(response => response.json())
    //  .then(data => setUsers(data));
  }, []);

  const [user, setUser] = React.useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(user);
    try{
      setLoading(true);
      setError(null);
      const response = await fetch(createUserAPi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      // setUsers([...users, user]);
      setUser({
        name: '',
        email: '',
        phone: ''
      });
      setLoading(false);
    }catch(error) {
      // setError(error);
      setLoading(false);
      return;
    }
  }

  return (
    <div>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <InputText type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleInput} />
            </div>
            <div className="mb-3 mt-3">
                <label htmlFor="email" className="form-label">Email</label>
                <InputText type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleInput} />
            </div>
            <div className="mb-3">
                <label htmlFor="pwd" className="form-label">Phone</label>
                <InputText type="text" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleInput} />
            </div>
            <Button label="Submit" type="submit" className="btn btn-primary submit-btn" />
        </form>
    </div>
  )
}

export default login
