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
				<h4>company</h4>
				<ul>
					<li><a href="/">about us</a></li>
					<li><a href="/">our services</a></li>
					<li><a href="/">privacy policy</a></li>
					<li><a href="/">visit website</a></li>
				</ul>
			</div>
			<div className="footer-col">
				<h4>get help</h4>
				<ul>
					<li><a href="/">FAQ</a></li>
					<li><a href="/">shipping</a></li>
					<li><a href="/">returns</a></li>
					<li><a href="/">order status</a></li>
					<li><a href="/">payment options</a></li>
				</ul>
			</div>
			<div className="footer-col">
				<h4>online shop</h4>
				<ul>
					<li><a href="/">download</a></li>
					<li><a href="/">changelog</a></li>
					<li><a href="/">github</a></li>
					<li><a href="/">all version</a></li>
				</ul>
			</div>
			<div className="footer-col">
				<h4>follow us</h4>
				<div className="social-links">
					<a href="/"><TiSocialLinkedin/></a>
					<a href="/"><FaXTwitter /></a>
					<a href="/"><FaInstagram /></a>
					<a href="/"><FaFacebookF /></a>
				</div>
			</div>
		</div>
	    </footer>
        </div>
        </>
    )
}

export default FooterPart;