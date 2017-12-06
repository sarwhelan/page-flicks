CREATE DEFINER=`root`@`localhost` PROCEDURE `wishlist`(
IN p_email varchar(50)
)
BEGIN

select bookTitle, authorName from Book where bookNum in (select bookNum from Wishlist where accountNum = (select accountNum from Reader where emailAddress = p_email));

END
