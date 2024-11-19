export default interface NavBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isHomeScreen: boolean;
}
