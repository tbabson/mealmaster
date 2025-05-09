import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SocialShare";

const SocialShare = ({ url, title }) => {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  };

  const handleShare = (platform) => {
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  return (
    <Wrapper>
      <button
        onClick={() => handleShare("facebook")}
        className="share-button facebook"
      >
        <FaFacebook /> Share
      </button>
      <button
        onClick={() => handleShare("twitter")}
        className="share-button twitter"
      >
        <FaTwitter /> Tweet
      </button>
      <button
        onClick={() => handleShare("linkedin")}
        className="share-button linkedin"
      >
        <FaLinkedin /> Share
      </button>
      <button
        onClick={() => handleShare("whatsapp")}
        className="share-button whatsapp"
      >
        <FaWhatsapp /> Share
      </button>
    </Wrapper>
  );
};

export default SocialShare;
