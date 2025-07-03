import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Copy, QrCode } from "lucide-react";
import { toast } from "sonner";

interface ShareOptionsProps {
  url: string;
  title: string;
  onQrCodeClick?: () => void;
  trigger: React.ReactNode;
}

const SocialIcon = ({
  name,
  ...props
}: {
  name: string;
  [key: string]: any;
}) => {
  return (
    <span className="text-lg" {...props}>
      {name.charAt(0)}
    </span>
  );
};

export default function ShareOptions({
  url,
  title,
  onQrCodeClick,
  trigger,
}: ShareOptionsProps) {
  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);

    toast("Link Copied!", {
      description: "The product link has been copied to your clipboard.",
    });
  };

  const handleShare = (e: React.MouseEvent, platformUrl: string) => {
    e.stopPropagation();
    window.open(platformUrl, "_blank", "noopener,noreferrer");
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const socialPlatforms = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X",
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    },
  ];
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent side="top" align="center" className="w-auto p-1">
        <div className="flex items-center gap-1 bg-card border rounded-full shadow-md p-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handleCopyLink}
          >
            <Copy className="h-4 w-4" />
          </Button>
          {onQrCodeClick && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onQrCodeClick();
              }}
            >
              <QrCode className="h-4 w-4" />
            </Button>
          )}
          {socialPlatforms.map((platform) => (
            <Button
              key={platform.name}
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={(e) => handleShare(e, platform.url)}
            >
              <SocialIcon name={platform.name} />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
