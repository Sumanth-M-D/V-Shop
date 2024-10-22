import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

function SocialMedia() {
  return (
    <div className="flex gap-2 pt-1">
      <FaFacebook className="socialMedia" />
      <FaXTwitter className="socialMedia" />
      <FaInstagram className="socialMedia" />
      <FaYoutube className="socialMedia" />
      <FaPinterest className="socialMedia" />
    </div>
  );
}

export default SocialMedia;
