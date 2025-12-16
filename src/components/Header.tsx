import { Button } from '@/components/ui/button';
import { GraduationCap, LogOut } from 'lucide-react';

const Header = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-background" />
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
