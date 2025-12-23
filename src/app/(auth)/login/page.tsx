import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { login } from "../actions";
import { getTranslations } from 'next-intl/server';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const { message } = await searchParams;
  const t = await getTranslations('Auth');

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t('login')}</CardTitle>
          <CardDescription>
            {t('login_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t('email_placeholder')}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{t('password')}</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  {t('forgot_password')}
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            {message && (
                <p className="text-sm text-red-500 text-center">{message}</p>
            )}
            <Button type="submit" className="w-full">
              {t('login')}
            </Button>
            <Button variant="outline" className="w-full">
              {t('login_google')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm">
             {t('no_account')}{" "}
            <Link href="/signup" className="underline ml-1">
              {t('signup')}
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
