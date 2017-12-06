CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(
IN p_email varchar(50)
)
BEGIN

if (select exists (select 1 from Reader where emailAddress = p_email)) then
	select 'username exists!';
else select 'username does not exist';

END IF;

END
