import { PropsWithChildren, createContext, useContext } from "react";
import { Typography, styled, TypographyProps } from "@mui/material";
import { useTranslation, I18nextProvider } from "react-i18next";
import translationEN from "@/shared/translations/locales/en";
import i18n from "@/shared/translations/init18n";

interface TextContextI {
  texts: {
    [key: string]:
      | string
      | Record<string, unknown>
      | {
          id: string;
          label: string;
        }[];
  };
}

const TextsContext = createContext<TextContextI | null>(null);

const useTexts = () => {
  const context = useContext(TextsContext);
  if (!context) {
    throw new Error(`useTexts must be used within a TextProvider`);
  }
  return context;
};

interface TxtProps extends TypographyProps {
  txtKey: string;
  options?: { [key: string]: string | number };
}

export const Txt = ({ txtKey, options = {}, ...rest }: TxtProps) => {
  const { t } = useTranslation();

  return <Typography {...rest}>{t(txtKey, options)}</Typography>;
};

type StyledProps = Omit<TxtProps, "as"> & { forwardedAs?: string };

export const StyledText = styled(Txt)<StyledProps>``;

type TextsProviderProps = PropsWithChildren<unknown>;

const TextsProvider = ({ children }: TextsProviderProps) => {
  const texts = { ...translationEN };
  const value: TextContextI = {
    texts,
  };
  return (
    <I18nextProvider i18n={i18n}>
      <TextsContext.Provider value={value}>{children}</TextsContext.Provider>
    </I18nextProvider>
  );
};

export { TextsProvider, useTexts };
