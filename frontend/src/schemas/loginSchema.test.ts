import { loginSchema } from '@/schemas/loginSchema'

describe('loginSchema', () => {
  it('accepts valid data', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'StrongP@ss1',
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty email with emailRequired', () => {
    const result = loginSchema.safeParse({ email: '', password: 'StrongP@ss1' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const emailError = result.error.issues.find((i) => i.path.includes('email'))
      expect(emailError?.message).toBe('login.errors.emailRequired')
    }
  })

  it('rejects invalid email format with emailInvalid', () => {
    const result = loginSchema.safeParse({ email: 'not-an-email', password: 'StrongP@ss1' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const emailError = result.error.issues.find((i) => i.path.includes('email'))
      expect(emailError?.message).toBe('login.errors.emailInvalid')
    }
  })

  it('rejects password shorter than 8 characters', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: 'Aa1!' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const pwError = result.error.issues.find((i) => i.path.includes('password'))
      expect(pwError?.message).toBe('login.errors.passwordMinLength')
    }
  })

  it('rejects password missing uppercase letter', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: 'weakpass1!' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const pwError = result.error.issues.find((i) => i.path.includes('password'))
      expect(pwError?.message).toBe('login.errors.passwordUppercase')
    }
  })

  it('rejects password missing special character', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: 'WeakPass1a' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const pwError = result.error.issues.find((i) => i.path.includes('password'))
      expect(pwError?.message).toBe('login.errors.passwordSpecial')
    }
  })
})
