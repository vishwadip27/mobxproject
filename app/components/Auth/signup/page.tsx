import React from 'react'

const signup = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  )
}

export default signup
