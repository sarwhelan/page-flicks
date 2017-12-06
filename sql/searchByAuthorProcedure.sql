CREATE DEFINER=`root`@`localhost` PROCEDURE `searchByAuthor`(
IN p_authorName varchar(50)
)
BEGIN

select bookTitle, authorName from Book where authorName like p_authorName;


END
