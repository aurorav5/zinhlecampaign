import { useState } from "react";
import { Facebook, MessageCircle, Link2, Check } from "lucide-react";

const SHARE_URL = "https://zinhlecampaign.lovable.app/";
const SHARE_TEXT =
  "She Sang to a Tortoise — a true story from the Baviaanskloof. Listen to Zinhle.";

export function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${SHARE_URL}`)}`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const btn =
    "inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-transparent px-5 py-2.5 text-sm text-[color:var(--cream)] transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]";

  return (
    <div className="flex flex-wrap gap-3">
      <a href={fbHref} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on Facebook">
        <Facebook className="h-4 w-4" /> Facebook
      </a>
      <a href={waHref} target="_blank" rel="noopener noreferrer" className={btn} aria-label="Share on WhatsApp">
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
      <button type="button" onClick={onCopy} className={btn} aria-label="Copy campaign link">
        {copied ? <Check className="h-4 w-4 text-[color:var(--gold)]" /> : <Link2 className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
