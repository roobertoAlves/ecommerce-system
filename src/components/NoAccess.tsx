"use client";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

const NoAccess = ({ details }: { details?: string }) => {
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
  const message = details ?? t("noAccess");

  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-bg-secondary p-4">
      <Card className="w-full max-w-md p-5">
        <CardHeader className="flex items-center flex-col">
          <Logo />
          <CardTitle className="text-2xl font-bold text-center">Welcome!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center font-medium text-text-muted">{message}</p>
          <SignInButton mode="modal">
            <Button className="w-full" size="lg">{t("signIn")}</Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full" size="lg">{t("signUp")}</Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;
