CREATE DEFINER=`root`@`localhost` PROCEDURE `leaderboard`()
BEGIN

select Reader.fullName as ReaderName, a.NUM as NumBooksRead from (select accountNum, count(*) as NUM from Rating group by accountNum) a
join Reader on a.accountNum = Reader.accountNum order by a.NUM desc;

END
