import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { signup } from "../actions";
import { RoleSelector } from "@/components/auth/role-selector";
import { getTranslations } from 'next-intl/server';

export default async function SignupPage({
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
          <CardTitle className="text-2xl">{t('create_account')}</CardTitle>
          <CardDescription>
            {t('signup_desc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signup} className="grid gap-4">
            <RoleSelector />
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
              <Label htmlFor="password">{t('password')}</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {message && (
                <p className="text-sm text-red-500 text-center">{message}</p>
            )}
            <Button type="submit" className="w-full">
              {t('create_account')}
            </Button>
          </form>
        </CardContent>
         <CardFooter className="justify-center text-sm">
             {t('has_account')}{" "}
            <Link href="/login" className="underline ml-1">
              {t('login')}
            </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
