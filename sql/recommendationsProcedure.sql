CREATE DEFINER=`root`@`localhost` PROCEDURE `recommendations`(
IN p_email varchar(50)
)
BEGIN

select bookTitle, authorName from Book where bookNum in (select bookNum from Genre where genreOne in
	(select genreOne from
		((select genreOne, count(*) as NUM from Genre where bookNum in
			(select bookNum from Download where accountNum = (select accountNum from Reader where emailAddress = p_email)) group by genreOne order by NUM desc limit 3) as a))) limit 10;

END
