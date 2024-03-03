import React from "react";
import "./FooterPart.css";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const FooterPart = () => {
    return (
        <>
        <div>
        <footer className="footer">
		<div className="container row">
			<div className="footer-col">
				<h4 style={{textAlign: "center"}}>company</h4>
				<ul>
					<li><a href="/" style={{textAlign: "center"}}>about us</a></li>
					<li><a href="/" style={{textAlign: "center"}}>our services</a></li>
					<li><a href="/" style={{textAlign: "center"}}>privacy policy</a></li>
					<li><a href="/" style={{textAlign: "center"}}>visit website</a></li>
				</ul>
			</div>
			<div className="footer-col">
				<h4 style={{textAlign: "center"}}>get help</h4>
				<ul>
					<li><a href="/" style={{textAlign: "center"}}>FAQ</a></li>
					<li><a href="/" style={{textAlign: "center"}}>shipping</a></li>
					<li><a href="/" style={{textAlign: "center"}}>returns</a></li>
					<li><a href="/" style={{textAlign: "center"}}>order status</a></li>
					<li><a href="/" style={{textAlign: "center"}}>payment options</a></li>
				</ul>
			</div>
			<div className="footer-col">
				<h4 style={{textAlign: "center"}}>online shop</h4>
				<ul>
					<li><a href="/" style={{textAlign: "center"}}>download</a></li>
					<li><a href="/" style={{textAlign: "center"}}>changelog</a></li>
					<li><a href="/" style={{textAlign: "center"}}>github</a></li>
					<li><a href="/" style={{textAlign: "center"}}>all version</a></li>
				</ul>
			</div>
			<div className="footer-col">
				<h4 style={{textAlign: "center"}}>follow us</h4>
				<div className="social-links" style={{textAlign: "center"}}>
					<a href="/" style={{textAlign: "center"}}><TiSocialLinkedin/></a>
					<a href="/" style={{textAlign: "center"}}><FaXTwitter /></a>
					<a href="/" style={{textAlign: "center"}}><FaInstagram /></a>
					<a href="/" style={{textAlign: "center"}}><FaFacebookF /></a>
				</div>
			</div>
		</div>
	    </footer>
        </div>
        </>
    )
}

export default FooterPart;