import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/Button'
import GoogleIcon from '@/components/ui/GoogleIcon'
import LinkedInIcon from '@/components/ui/LinkedInIcon'
import { loginWithGoogle, loginWithLinkedIn } from '@/services/authService'

export default function OAuthButtons() {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        size="sm"
        type="button"
        className="group"
        onClick={() => void loginWithGoogle()}
      >
        <GoogleIcon />
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground font-mono">
          {t('login.google')}
        </span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        type="button"
        className="group"
        onClick={() => void loginWithLinkedIn()}
      >
        <LinkedInIcon />
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground font-mono">
          {t('login.linkedin')}
        </span>
      </Button>
    </div>
  )
}
