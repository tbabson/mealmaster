import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import styled from "styled-components";

const SocialShareWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  justify-content: center;

  .share-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--border-radius);
    color: var(--white);
    cursor: pointer;
    transition: var(--transition);
    font-size: 1rem;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .facebook {
    background: #3b5998;
    &:hover {
      background: #344e86;
    }
  }

  .twitter {
    background: #1da1f2;
    &:hover {
      background: #1a91da;
    }
  }

  .linkedin {
    background: #0077b5;
    &:hover {
      background: #006396;
    }
  }

  .whatsapp {
    background: #25d366;
    &:hover {
      background: #21bd5b;
    }
  }
`;

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
    <SocialShareWrapper>
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
    </SocialShareWrapper>
  );
};

export default SocialShare;
