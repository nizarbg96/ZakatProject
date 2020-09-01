package smoothalgo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import smoothalgo.domain.Balance;
import smoothalgo.domain.Zakat;
import smoothalgo.repository.BalanceRepository;
import smoothalgo.service.BalanceService;
import smoothalgo.service.PeriodService;
import smoothalgo.domain.Period;
import smoothalgo.repository.PeriodRepository;
import smoothalgo.service.ZakatService;
import smoothalgo.service.dto.BalanceDTO;
import smoothalgo.service.dto.BeneficiaryDTO;
import smoothalgo.service.dto.PeriodDTO;
import smoothalgo.service.dto.ZakatDTO;
import smoothalgo.service.mapper.BalanceMapper;
import smoothalgo.service.mapper.PeriodMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import smoothalgo.service.mapper.ZakatMapper;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

/**
 * Service Implementation for managing {@link Period}.
 */
@Service
@Transactional
public class PeriodServiceImpl implements PeriodService {

    private final Logger log = LoggerFactory.getLogger(PeriodServiceImpl.class);

    private final PeriodRepository periodRepository ;

    private final BalanceRepository balanceRepository ;

    private final BalanceService balanceService;

    private final PeriodMapper periodMapper;

    private final BalanceMapper balanceMapper;

    private  final ZakatService zakatService;

    private final ZakatMapper zakatMapper;

    private final BigDecimal NISAB = new BigDecimal(11880);

    public PeriodServiceImpl(PeriodRepository periodRepository, BalanceServiceImpl balanceService,
                             BalanceRepository balanceRepository, PeriodMapper periodMapper, BalanceMapper balanceMapper,
                             ZakatServiceImpl zakatService, ZakatMapper zakatMapper) {
        this.periodRepository = periodRepository;
        this.periodMapper = periodMapper;
        this.balanceMapper = balanceMapper;
        this.zakatService = zakatService;
        this.zakatMapper = zakatMapper;
        this.balanceRepository = balanceRepository;
        this.balanceService = balanceService;

    }

    /**
     * Save a period.
     *
     * @param periodDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PeriodDTO save(PeriodDTO periodDTO) {
        log.debug("Request to save Period : {}", periodDTO);
        Period period = periodMapper.toEntity(periodDTO);
        period = periodRepository.save(period);
        return periodMapper.toDto(period);
    }

    /**
     * Get all the periods.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PeriodDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Periods");
        return periodRepository.findAll(pageable)
            .map(periodMapper::toDto);
    }
    @Override
    @Transactional(readOnly = true)
    public Page<PeriodDTO> findAllPeriodsByLoginUserPagination(Pageable pageable, String login){
        log.debug("Request to get all Periods By User Login");
        return periodRepository.findAllByExtraUser_User_Login(pageable,login)
            .map(periodMapper::toDto);
    }

    /**
     * Get one period by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PeriodDTO> findOne(Long id) {
        log.debug("Request to get Period : {}", id);
        return periodRepository.findById(id)
            .map(periodMapper::toDto);
    }

    /**
     * Delete the period by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Period : {}", id);
        periodRepository.deleteById(id);
    }
    /**
     * Delete the periods by login.
     *
     * @param login the login of the user.
     */
    @Override
    public void deleteAllByLogin(String login) {
        log.debug("Request to delete Periods : {}", login);
        periodRepository.deleteAllByExtraUser_User_Login(login);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PeriodDTO> findAllPeriodsByLoginUser(String login) {
        log.debug("Request to get all Periods");
        List<PeriodDTO> periods = periodMapper.toDto(periodRepository.findAllByExtraUser_User_Login(login));
        Collections.sort(periods, new Comparator<PeriodDTO>() {
            @Override
            public int compare(PeriodDTO o1, PeriodDTO o2) {
                return o1.getBeginDate().compareTo(o2.getBeginDate());
            }
        });
        return periods;

    }
    /**
     * find the last element in the Table.
     *
     * .
     */
    @Override
    @Transactional(readOnly = true)
    public PeriodDTO findLatestPeriod(String login){
        log.debug("Request to get all Periods");
        List<PeriodDTO> periods = periodMapper.toDto(periodRepository.findAllByExtraUser_User_Login(login));
        if (periods.size() != 0){
            PeriodDTO lastPeriod = periods.get(periods.size()-1);
            return lastPeriod;
        }else {
            return null;
        }


    };
    @Override
    public Period updatePeriodWhenOldBalance(BalanceDTO balance,String login){
        List<PeriodDTO> periods = findAllPeriodsByLoginUser(login) ;
        Boolean inPeriod=false;
        PeriodDTO currentPeriod = null;
        PeriodDTO nextPeriod = null;
        PeriodDTO periodToReturn = null;
        for (int i=0;i<periods.size()-1;i++) {
                if ((balance.getBalanceDate().isAfter(periods.get(i).getBeginDate()) &&
                    balance.getBalanceDate().isBefore(periods.get(i).getEndDate()))||
                    (balance.getBalanceDate().isEqual(periods.get(i).getBeginDate()))||
                    (balance.getBalanceDate().isEqual(periods.get(i).getEndDate()))) {

                    // if the balance is in one of the  periods
                    inPeriod = true;
                    currentPeriod = periods.get(i);
                    nextPeriod = periods.get(i + 1);
                    break;
                }
        }
        if (inPeriod==false) {
            // if the balance is not in one of the periods
            for (int i=0;i<periods.size();i++) {
                if (i == 0) {
                    if (balance.getBalanceDate().isBefore(periods.get(i).getBeginDate()))
                    {// if the balance is before the  first period
                        nextPeriod = periods.get(i);
                        break;
                    }
                }
                else {
                    if (balance.getBalanceDate().isBefore(periods.get(i).getBeginDate())&&
                        balance.getBalanceDate().isAfter(periods.get(i-1).getEndDate()))
                    {
                        //if the balance is between 2 defined periods
                        nextPeriod = periods.get(i);
                        break;
                    }
                }
            }
        }

        //after getting the position of the balance in periods {currentPeriod or nextPeriod}

        if (balance.getBalanceAmount().compareTo(NISAB) >= 0 ){ //if balanceAmount is greater than NISAB
            // if balance is in a period
            if (inPeriod){
                // we just gonna add that balance to the currentPeriod
                balance.setPeriodId(currentPeriod.getId());
                Balance balanceToUpdate = balanceMapper.toEntity(balance);
                balanceToUpdate= balanceRepository.save(balanceToUpdate);
                periodToReturn=currentPeriod;
            }
            // if balance is between 2 periods or before a period
            else {
                long distance = ChronoUnit.DAYS.between(balance.getBalanceDate(), nextPeriod.getBeginDate());
                if (distance>365){// if nextPeriod is far more than 365 day
                    BalanceDTO firstUnderNisabBalance = getFirstUnderNisabBalance(balance.getBalanceDate(), 365,login);
                    // if we have in our way to nextPeriod a balance underNisab
                    if (firstUnderNisabBalance!=null){
                         //create a non taxable period until next underNisab balance
                        PeriodDTO newPeriod = new PeriodDTO();
                        newPeriod.setBeginDate(balance.getBalanceDate());
                        newPeriod.setEndDate(firstUnderNisabBalance.getBalanceDate());
                        newPeriod.setTaxable(false);
                        newPeriod.setExtraUserId(nextPeriod.getExtraUserId());
                        periodToReturn=save(newPeriod);
                        balance.setPeriodId(periodToReturn.getId());
                        balanceRepository.save(balanceMapper.toEntity(balance));
                    }else {// if we don't have in our way to nextPeriod a balance underNisab :
                        //create a taxable period that have duration 365 day
                        PeriodDTO newPeriod = new PeriodDTO();
                        newPeriod.setBeginDate(balance.getBalanceDate());
                        newPeriod.setEndDate(balance.getBalanceDate().plusDays(365));
                        newPeriod.setTaxable(true);
                        newPeriod.setExtraUserId(nextPeriod.getExtraUserId());
                        newPeriod=save(newPeriod); // create new period
                        ZakatDTO zakat = createZakatForPeriod(newPeriod,balance); // create new zakat
                        newPeriod.setZakatId(zakat.getId());
                        save(newPeriod);// assign zakat to period

                        balance.setPeriodId(newPeriod.getId());
                        balanceRepository.save(balanceMapper.toEntity(balance));
                        balance.setBalanceDate(newPeriod.getEndDate().plusDays(1));
                        PeriodDTO lastPeriod = findLatestPeriod(login);
                        // after we have closed a taxable period, we will remake updating priods process
                        // because we still have balance above Nisab
                        if (balance.getBalanceDate().isBefore(lastPeriod.getBeginDate())){
                            updatePeriodWhenOldBalance(balance,login); //if it is oldBalance
                        }
                    }
                }
                else { // if nextPeriod is far less than 365 day
                    if (nextPeriod.isTaxable()){
                        // if next Period is taxable , we will not update nextPeriod, we will just create a new non taxable period
                        //creating a non taxable Period
                        long range = ChronoUnit.DAYS.between(balance.getBalanceDate(),nextPeriod.getBeginDate());
                        BalanceDTO firstUnderNisabBalance = getFirstUnderNisabBalance(balance.getBalanceDate(),range,login);
                        if (firstUnderNisabBalance!=null){
                            //create a non taxable period until next UnderNisabBalance
                            PeriodDTO newPeriod = new PeriodDTO();
                            newPeriod.setBeginDate(balance.getBalanceDate());
                            newPeriod.setEndDate(firstUnderNisabBalance.getBalanceDate());
                            newPeriod.setTaxable(false);
                            newPeriod.setExtraUserId(nextPeriod.getExtraUserId());
                            periodToReturn=save(newPeriod);
                            balance.setPeriodId(periodToReturn.getId());
                            balanceRepository.save(balanceMapper.toEntity(balance));
                        }
                        else {
                            // create a non taxable period until nextPeriod.beginDate
                            PeriodDTO newPeriod = new PeriodDTO();
                            newPeriod.setBeginDate(balance.getBalanceDate());
                            newPeriod.setEndDate(nextPeriod.getBeginDate().minusDays(1));
                            newPeriod.setTaxable(false);
                            newPeriod.setExtraUserId(nextPeriod.getExtraUserId());
                            periodToReturn=save(newPeriod);
                            balance.setPeriodId(periodToReturn.getId());
                            balanceRepository.save(balanceMapper.toEntity(balance));
                        }

                    }else {
                        // if next Period is not taxable:
                        // we  will  update nextPeriod if we don't have underNisab balance in our way to next Period
                        long range = ChronoUnit.DAYS.between(balance.getBalanceDate(),nextPeriod.getBeginDate());
                        BalanceDTO firstUnderNisabBalance = getFirstUnderNisabBalance(balance.getBalanceDate(),range,login);
                        if (firstUnderNisabBalance!=null){ // we have underNisab balance in our way
                            //create a non taxable period until next underNisab balance
                            PeriodDTO newPeriod = new PeriodDTO();
                            newPeriod.setBeginDate(balance.getBalanceDate());
                            newPeriod.setEndDate(firstUnderNisabBalance.getBalanceDate());
                            newPeriod.setTaxable(false);
                            newPeriod.setExtraUserId(nextPeriod.getExtraUserId());
                            periodToReturn=save(newPeriod);
                            balance.setPeriodId(periodToReturn.getId());
                            balanceRepository.save(balanceMapper.toEntity(balance));
                        }else {//  if we don't have underNisab balance in our way to next Period
                            if (nextPeriod.getEndDate()!=null){
                                //if next period is not opened we will update its beginDate
                                nextPeriod.setBeginDate(balance.getBalanceDate());
                                long duration = ChronoUnit.DAYS.between(nextPeriod.getBeginDate(),nextPeriod.getBeginDate());
                                if (duration>=365){
                                    //then, if our updated period is much longer than 365 day we will update its endDate
                                    nextPeriod.setEndDate(nextPeriod.getBeginDate().plusDays(365));
                                }
                                periodToReturn=save(nextPeriod);
                                balance.setPeriodId(periodToReturn.getId());
                                balanceRepository.save(balanceMapper.toEntity(balance));
                            }
                            else {
                                //if next period is opened we will just update its beginDate
                                nextPeriod.setBeginDate(balance.getBalanceDate());
                                periodToReturn=save(nextPeriod);
                                balance.setPeriodId(periodToReturn.getId());
                                balanceRepository.save(balanceMapper.toEntity(balance));
                            }
                        }
                    }
                }
            }
        }
        else {
            //if balanceAmount is smaller than the NISAB
            if (inPeriod){
                //if the balance is into a period
                if (currentPeriod.isTaxable()){
                    //we will update the endDate of that Period and taxable to false
                    currentPeriod.setEndDate(balance.getBalanceDate());
                    currentPeriod.setTaxable(false);
                    periodToReturn=save(currentPeriod);
                    balance.setPeriodId(periodToReturn.getId());
                    balanceService.save(balance);
                }
                else {
                    //we will just update the endDate of that Period
                    currentPeriod.setEndDate(balance.getBalanceDate());
                    periodToReturn=save(currentPeriod);
                    balance.setPeriodId(periodToReturn.getId());
                    balanceService.save(balance);
                }
            }
        }
        assignTexable(login);
        return  periodMapper.toEntity(periodToReturn);
    }

    @Override
    public Period updatePeriodWhenNewBalance(BalanceDTO balance,String login){
       PeriodDTO lastPeriod = findLatestPeriod(login);
       PeriodDTO periodToReturn = null ;
       //if last period is opened
       if (lastPeriod.getEndDate()==null){
           long disatance = ChronoUnit.DAYS.between(lastPeriod.getBeginDate(),balance.getBalanceDate());
           if (disatance>365){ // if time-distance is more than 365 day between last period begind date and balance date
               // update last period to a full taxable Period
               lastPeriod.setEndDate(lastPeriod.getBeginDate().plusDays(365));
               lastPeriod.setTaxable(true);
               ZakatDTO zakat = createZakatForPeriod(lastPeriod,balance);
               lastPeriod.setZakatId(zakat.getId());
               periodToReturn=save(lastPeriod);
               // remake process with new lastPeriod
               updatePeriodWhenNewBalance(balance,login);
           }else {
           //now if time-distance is less than 365 day from lastPeriod BeginDate  to the balance date
               // if balanceAmount is under NISAB
               if(balance.getBalanceAmount().compareTo(NISAB) < 0){
                   //update lastPeriod to a closed non-texable period
                   lastPeriod.setEndDate(balance.getBalanceDate());
                   periodToReturn=save(lastPeriod);
                   balance.setPeriodId(periodToReturn.getId());
                   balanceService.save(balance);
               }else {
                   //just add balance to the opened Period if balanceAmount is greater than nisab
                   balance.setPeriodId(lastPeriod.getId());
                   balanceRepository.save(balanceMapper.toEntity(balance));
               }
           }
       }
       //if last period is closed
        else {
            //if balance is inside lastPeriod
            if ((balance.getBalanceDate().isAfter(lastPeriod.getBeginDate()) &&
                balance.getBalanceDate().isBefore(lastPeriod.getEndDate()))||
                (balance.getBalanceDate().isEqual(lastPeriod.getBeginDate()))) {
                // if balance is under NISAB
                if(balance.getBalanceAmount().compareTo(NISAB) < 0){
                    //update lastPeriod to a non-texable period
                    lastPeriod.setEndDate(balance.getBalanceDate());
                    lastPeriod.setTaxable(false);
                    periodToReturn=save(lastPeriod);
                    balance.setPeriodId(periodToReturn.getId());
                    balanceService.save(balance);
                }else {
                    //just add balance to the opened Period if balanceAmount is greater than nisab
                    balance.setPeriodId(lastPeriod.getId());
                    balanceRepository.save(balanceMapper.toEntity(balance));
                }
            //if balance is outside lastPeriod
            }else{
                // if balanceAmount is greater than nisab
                if(balance.getBalanceAmount().compareTo(NISAB) >= 0){
                    BalanceDTO firstUnderNisabBalance = getFirstUnderNisabBalance(balance.getBalanceDate(),365,login);
                    //create a new Period and  close it if there is a nextBalance underNisab in next 365 days
                    //else it remain opened
                    PeriodDTO newPeriod = new PeriodDTO();
                    newPeriod.setBeginDate(balance.getBalanceDate());
                    newPeriod.setTaxable(false);
                    newPeriod.setExtraUserId(lastPeriod.getExtraUserId());
                    if (firstUnderNisabBalance!=null){
                        newPeriod.setEndDate(firstUnderNisabBalance.getBalanceDate());
                    }
                    periodToReturn=save(newPeriod);
                    balance.setPeriodId(periodToReturn.getId());
                    balanceService.save(balance);
                }
            }
       }
        return  periodMapper.toEntity(periodToReturn);
    }

    // function that assign taxable attribute in Period Table
    public void assignTexable(String login){
        List<PeriodDTO> periods = findAllPeriodsByLoginUser(login);
        for (PeriodDTO period:periods) {
            if (period.getEndDate()!=null){
                long days = ChronoUnit.DAYS.between(period.getBeginDate(), period.getEndDate());
                if (days>=365){
                    period.setTaxable(true);
                }else {
                    period.setTaxable(false);
                }
                save(period);
            }
        }
    }
    // function that return the first next balance under Nisab after beginSearchDate
    //range define the limit of search
    public BalanceDTO getFirstUnderNisabBalance(LocalDate beginSearchDate,long range,String login){
        List<BalanceDTO> balances= balanceMapper
            .toDto(balanceRepository.findBalancesByBankAccount_ExtraUser_User_Login(login));
        Collections.sort(balances, new Comparator<BalanceDTO>() {
            @Override
            public int compare(BalanceDTO o1, BalanceDTO o2) {
                return o1.getBalanceDate().compareTo(o2.getBalanceDate());
            }
        });
        BalanceDTO balanceToReturn = null;
        for (BalanceDTO balance: balances) {
            if ((balance.getBalanceDate().isAfter(beginSearchDate))&&
                (balance.getBalanceAmount().compareTo(NISAB) < 0))
            {
                long distance = ChronoUnit.DAYS.between(beginSearchDate,balance.getBalanceDate());
                if (distance<=range){
                    balanceToReturn=balance;
                    break;
                }else {
                    break;
                }
            }
        }
        return balanceToReturn;
    }

    public List<PeriodDTO> getTaxablePeriods(String login,String taxable){
        List<PeriodDTO> periods = findAllPeriodsByLoginUser(login);
        List<PeriodDTO> taxablePeriods= new ArrayList<PeriodDTO>();
        List<PeriodDTO> nonTaxablePeriods=new ArrayList<PeriodDTO>();
        for (PeriodDTO period: periods) {
            if (period.isTaxable()){
                taxablePeriods.add(period);
            }
            else{
                nonTaxablePeriods.add(period);
            }
        }
        if (taxable.equalsIgnoreCase("true"))
        return taxablePeriods;
        else
            return nonTaxablePeriods;
    }

    public ZakatDTO createZakatForPeriod(PeriodDTO period,BalanceDTO balance){

        BigDecimal zakatRate = new BigDecimal("0.025");
        BigDecimal dueAmount = balance.getBalanceAmount().multiply(zakatRate);
        ZakatDTO zakat = new ZakatDTO() ;
        zakat.setExtraUserId(period.getExtraUserId());
        zakat.setDueAmount(dueAmount);
        zakat.setRemainingAmount(dueAmount);
        Zakat zakatEntity = zakatMapper.toEntity(zakat);
        Period periodEntity = periodMapper.toEntity(period);
        zakatEntity.setPeriod(periodEntity);
        zakat=zakatService.save(zakatMapper.toDto(zakatEntity));
        log.debug("///zakatEntity created /// = "+zakatEntity);
        return zakat;
    }
    @Override
    public List<PeriodDTO> assignPeriodsToBalances(List<BalanceDTO> balances, Long userId, String userLogin) {
        balances.forEach(balance -> {
            PeriodDTO latestPeriod = findLatestPeriod(userLogin);
            if (latestPeriod != null) {
                //adding balance
                if (balance.getBalanceDate().isAfter(latestPeriod.getBeginDate())) {
                    // adding new balance
                    updatePeriodWhenNewBalance(balance, userLogin);
                } else {
                    //adding old balance
                    updatePeriodWhenOldBalance(balance, userLogin);
                }
            } else {
                if (balance.getBalanceAmount().compareTo(NISAB) >= 0){
                    //add new Period
                    PeriodDTO newPeriod = new PeriodDTO();
                    newPeriod.setBeginDate(balance.getBalanceDate());
                    newPeriod.setTaxable(false);
                    newPeriod.setExtraUserId(userId);
                    PeriodDTO periodToReturn= save(newPeriod);
                    balance.setPeriodId(periodToReturn.getId());
                    balanceRepository.save(balanceMapper.toEntity(balance));
                }

            }

        });
        return findAllPeriodsByLoginUser(userLogin);
    }


}
