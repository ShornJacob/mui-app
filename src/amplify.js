

export const signUp = async(email,password) => {
    try {
      await Auth.signUp({ email, password})
      return 1
    } catch (err) {
      return err
    }
  }