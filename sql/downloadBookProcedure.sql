CREATE DEFINER=`root`@`localhost` PROCEDURE `downloadBook`(
IN p_bookName varchar(50),
IN p_email varchar(50)
)
BEGIN

delete from Wishlist where accountNum = (select accountNum from Reader where emailAddress = p_email) and bookNum = (select bookNum from Book where bookTitle = p_bookName);
select 'success';

END
