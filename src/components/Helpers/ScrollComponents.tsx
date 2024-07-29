import "./ScrollComponents.css";
interface VerticalScrollProps {
  children: React.ReactNode;
}

export const VerticalScroll: React.FC<VerticalScrollProps> = ({ children }) => {
  return (
    <div className="vertical-scroll-container">
      <div className="vertical-scroll-content">{children}</div>
    </div>
  );
};
