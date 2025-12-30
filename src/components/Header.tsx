import { Button } from '@/components/ui/button';
import { GraduationCap, LogOut } from 'lucide-react';
import Footer from '@/components/Footer';


const Header = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 overflow-hidden pt-2">
            <div className="w-100 h-14 bg-white flex items-center justify-center overflow-hidden">
              <img
                src="/col-kitelogo-removebg-preview2.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Faculty Appraisal System</h1>
              <p className="text-sm text-muted-foreground">Administration Dashboard</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
